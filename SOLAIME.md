# Fork Solaime de cal.diy

Ce fork sert au deploiement de l'agenda de prise de rendez-vous de Solaime
Energies, sur Vercel, projet `solaime-cal`, domaine
`cal.solaime-energies.com`.

Une seule difference avec `calcom/cal.diy` : la cle `functions` vide a ete
retiree de `apps/web/vercel.json`, parce que Vercel refuse desormais ce
schema. Pour suivre les versions amont :
`git fetch upstream && git merge upstream/main`.

Licence MIT, comme le depot d'origine.

Base de donnees. L'agenda a sa PROPRE base sur l'instance Neon, nommee
calcom, et le relais garde neondb. Un simple schema separe ne suffit pas :
la migration 20250505135207_create_booking_time_status_denormalized ecrit
public."BookingDenormalized" en dur, et echoue avec 42P01 des que le schema
n'est pas public. Les migrations de cal supposent public, il leur faut donc
une base a elles.

Les URL portent sslmode=require sans channel_binding, que le moteur de
migration de Prisma ne sait pas negocier, et pgbouncer=true sur la connexion
poolee.
