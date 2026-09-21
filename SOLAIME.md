# Fork Solaime de cal.diy

Ce fork sert au deploiement de l'agenda de prise de rendez-vous de Solaime
Energies, sur Vercel, projet `solaime-cal`, domaine
`cal.solaime-energies.com`.

Une seule difference avec `calcom/cal.diy` : la cle `functions` vide a ete
retiree de `apps/web/vercel.json`, parce que Vercel refuse desormais ce
schema. Pour suivre les versions amont :
`git fetch upstream && git merge upstream/main`.

Licence MIT, comme le depot d'origine.

Base de donnees. L'agenda partage l'instance Neon avec le relais, mais pas le
schema : le relais occupe public, l'agenda occupe calcom. Sans cette
separation, prisma migrate deploy refuse de s'installer dans un schema qu'il
ne gere pas, et la construction echoue apres avoir lu ses 595 migrations.

Les URL portent aussi sslmode=require sans channel_binding, que le moteur de
migration de Prisma ne sait pas negocier, et pgbouncer=true sur la connexion
poolee.
