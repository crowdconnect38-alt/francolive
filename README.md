# FrancoLive — MVP scaffold

Prototype front-end fonctionnel de la marketplace décrite dans le cahier des
charges : recherche/matching, profil enseignant, réservation, dashboards
apprenant/enseignant, et la **salle de classe vidéo intégrée** (le
différenciateur du produit). Toutes les données viennent de `lib/mock-data.ts`
— aucune base de données, aucun paiement réel, aucune vidéo réelle tant que
les clés ci-dessous ne sont pas configurées.

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000

## Pages incluses

- `/` — landing page
- `/teachers` — recherche avec filtres
- `/teachers/[id]` — profil enseignant + réservation
- `/booking` — réservation & paiement (mock Stripe)
- `/post-request` — publication d'une demande d'apprentissage
- `/dashboard/learner` — dashboard apprenant, bouton "Join Class"
- `/dashboard/teacher` — dashboard enseignant, revenus, demandes entrantes
- `/classroom/[sessionId]` — **salle de classe vidéo** (LiveKit)

## Pour rendre ça réellement fonctionnel

### 1. Base de données — Prisma (déjà inclus dans `prisma/schema.prisma`)

Le schéma complet est prêt : `User`, `TeacherProfile`, `LearnerProfile`,
`LearningRequest`, `TeacherProposal`, `Message`, `Booking`, `Payment`,
`LessonSession`, `LessonNote`, `Review`, `Favorite`, `Subscription`,
`SpeakingClub`, `Notification`.

```bash
npm install
# Renseigner DATABASE_URL dans .env (Postgres — Neon/Supabase/RDS)
npx prisma migrate dev --name init
npx prisma db seed
```

Le seed (`prisma/seed.ts`) recrée les 4 enseignants et l'apprenant de
démonstration. Une fois la base peuplée, remplacer les imports de
`lib/mock-data.ts` par des requêtes `prisma.*` (le client singleton est
dans `lib/prisma.ts`) — par exemple dans `app/teachers/page.tsx` :

```ts
import { prisma } from "@/lib/prisma";
const teachers = await prisma.teacherProfile.findMany({ include: { user: true } });
```

Point important côté sécurité : `LessonSession` (et donc le token LiveKit)
ne doit être délivré que lorsque `Booking.status === "CONFIRMED"` — c'est ce
qui empêche l'accès à un cours non payé.

### 2. Authentification
Ajouter Clerk ou Auth.js. Protéger `/dashboard/*` et `/classroom/*` derrière
une session valide, avec vérification que l'utilisateur fait bien partie de
la réservation avant de générer un token de salle.

### 3. Paiement — Stripe Connect
Dans `app/booking/page.tsx`, remplacer le bloc `[Stripe Checkout...]` par un
vrai appel serveur :

```ts
const paymentIntent = await stripe.paymentIntents.create({
  amount: teacher.pricePerHour * 100,
  currency: "usd",
  application_fee_amount: commission * 100,
  transfer_data: { destination: teacherConnectedAccountId },
});
```

Chaque enseignant doit avoir un compte Stripe Connect (onboarding via
`stripe.accountLinks.create`) avant de pouvoir recevoir des paiements.

### 4. Visioconférence — LiveKit Cloud
1. Créer un projet sur https://cloud.livekit.io
2. Ajouter dans `.env.local` :
   ```
   LIVEKIT_API_KEY=...
   LIVEKIT_API_SECRET=...
   NEXT_PUBLIC_LIVEKIT_URL=wss://ton-projet.livekit.cloud
   ```
3. Dans `app/api/livekit-token/route.ts`, remplacer le token mocké par un
   vrai `AccessToken` généré via `livekit-server-sdk` (code déjà commenté
   dans le fichier) — **et vérifier côté serveur que la réservation
   correspondante est bien payée/confirmée** avant de délivrer le token.
4. Dans `components/VideoClassroom.tsx`, passer `connect={true}` sur
   `<LiveKitRoom>`.

### 5. Tableau blanc
Remplacer le placeholder dans `VideoClassroom.tsx` par
`@excalidraw/excalidraw`, synchronisé en temps réel via `y-websocket` (une
room Yjs par `sessionId`).

### 6. Chat pendant le cours
Le chat local (state React) fonctionne pour la démo. En prod, brancher sur
Supabase Realtime, Pusher, ou les data channels natifs de LiveKit pour que
les deux participants voient les mêmes messages.

## Stack

Next.js 14 (App Router) · Tailwind CSS · LiveKit (visio) · Stripe Connect
(paiement) · lucide-react (icônes)

## Design system

Palette et typographie définies dans `tailwind.config.ts` — bleu café
(`bleu`), ochre signage (`ochre`), rouge sourdine (`rouge`), sauge
(`sage`), sur fond papier froid (`paper`). Élément signature : les cartes
"plaque émaillée" (`.plaque` dans `globals.css`) qui rappellent la
signalétique parisienne plutôt qu'une carte SaaS générique.
