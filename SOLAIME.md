# Fork Solaime de cal.diy

Ce fork sert au deploiement de l'agenda de prise de rendez-vous de Solaime
Energies, sur Vercel, projet `solaime-cal`, domaine
`cal.solaime-energies.com`.

Une seule difference avec `calcom/cal.diy` : la cle `functions` vide a ete
retiree de `apps/web/vercel.json`, parce que Vercel refuse desormais ce
schema. Pour suivre les versions amont :
`git fetch upstream && git merge upstream/main`.

Licence MIT, comme le depot d'origine.
