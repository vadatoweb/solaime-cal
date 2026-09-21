# Fork Solaime de cal.diy

Ce fork sert au deploiement de l'agenda de prise de rendez-vous de Solaime
Energies, sur Vercel, projet `solaime-cal`, domaine
`cal.solaime-energies.com`.

Une seule difference avec `calcom/cal.diy` : la cle `functions` vide a ete
retiree de `apps/web/vercel.json`, parce que Vercel refuse desormais ce
schema. Pour suivre les versions amont :
`git fetch upstream && git merge upstream/main`.

Licence MIT, comme le depot d'origine.

Note sur la base : les URL fournies par Neon portent channel_binding=require,
que le moteur de migration de Prisma ne gere pas. Les variables DATABASE_URL
et DATABASE_DIRECT_URL du projet Vercel sont donc posees a la main, sans ce
parametre, avec pgbouncer=true sur la connexion poolee.
