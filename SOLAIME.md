# Fork Solaime de cal.diy

Ce fork sert au deploiement de l'agenda de prise de rendez-vous de Solaime
Energies, sur Vercel, projet `solaime-cal`, domaine
`cal.solaime-energies.com`.

Une seule difference avec `calcom/cal.diy` : la cle `functions` vide a ete
retiree de `apps/web/vercel.json`, parce que Vercel refuse desormais ce
schema. Pour suivre les versions amont :
`git fetch upstream && git merge upstream/main`.

Licence MIT, comme le depot d'origine.

Base de donnees. L'agenda a sa propre base sur l'instance Neon, nommee
calcom ; le relais garde neondb. Un schema separe ne suffit pas : la
migration 20250505135207 ecrit public."BookingDenormalized" en dur et echoue
en 42P01 des que le schema n'est pas public.

Les 595 migrations ont ete appliquees UNE FOIS depuis un poste, avec
prisma migrate deploy, parce que les appliquer a froid pendant la
construction depasse la limite de 45 minutes de Vercel. Les constructions
suivantes n'ont plus rien a appliquer et tiennent en quelques minutes.

Les URL portent sslmode=require sans channel_binding, que le moteur de
migration de Prisma ne sait pas negocier, et pgbouncer=true sur la
connexion poolee.
