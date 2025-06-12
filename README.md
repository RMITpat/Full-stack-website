## getting started

```
███████╗████████╗███████╗██████╗      ██████╗ ███╗   ██╗███████╗
██╔════╝╚══██╔══╝██╔════╝██╔══██╗    ██╔═══██╗████╗  ██║██╔════╝
███████╗   ██║   █████╗  ██████╔╝    ██║   ██║██╔██╗ ██║█████╗
╚════██║   ██║   ██╔══╝  ██╔═══╝     ██║   ██║██║╚██╗██║██╔══╝
███████║   ██║   ███████╗██║         ╚██████╔╝██║ ╚████║███████╗
╚══════╝   ╚═╝   ╚══════╝╚═╝          ╚═════╝ ╚═╝  ╚═══╝╚══════╝
```

DATABASE CONNECTION INFORMATION
Please create a .env file with your database logins

After starting the backend, please type "y" when prompted to populate db with some data such as lecturer, admin and applicant sign ins, 3 premade courses and assigning those lecturers to those courses
or type "n" if you want to sign up manually and add yourself to courses manually using the admin dashboard

please note, not populating your database will lead to no admin dashboard sign in as you cannot sign up as an admin.
please restart the backend with "rs" then select repopulate if this occurs

## teachteam logins:

```
███████╗████████╗███████╗██████╗     ████████╗██╗    ██╗ ██████╗
██╔════╝╚══██╔══╝██╔════╝██╔══██╗    ╚══██╔══╝██║    ██║██╔═══██╗
███████╗   ██║   █████╗  ██████╔╝       ██║   ██║ █╗ ██║██║   ██║
╚════██║   ██║   ██╔══╝  ██╔═══╝        ██║   ██║███╗██║██║   ██║
███████║   ██║   ███████╗██║            ██║   ╚███╔███╔╝╚██████╔╝
╚══════╝   ╚═╝   ╚══════╝╚═╝            ╚═╝    ╚══╝╚══╝  ╚═════╝
```

The below logins will be present if you chose to populate your database
;
Lecturer sign ins:
email: aliceandrews@university.edu password: 14530@Aa  
email: bobbaker@university.edu password: 15030@Bb  
email: charliecarter@university.edu password: 15125@Cc  
email: dianadawson@university.edu password: 15225@Dd  
email: ethanevans@university.edu password: 15331@Ee  
email: fionafoster@university.edu password: 15425@Ff  
email: georgegriffin@university.edu password: 15524@Gg  
email: hannahhayes@university.edu password: 20024@Hh  
email: ianirwin@university.edu password: 20124@Ii  
email: juliajenkins@university.edu password: 20231@Jj  
email: kevinkeller@university.edu password: 20324@Kk  
email: lauralambert@university.edu password: 20424@Ll  
email: mikemason@university.edu password: 20525@Mm  
email: ninanorris@university.edu password: 21025@Nn  
email: oscarowens@university.edu password: 21131@Oo  
email: paulaparker@university.edu password: 21224@Pp  
email: quinnquincy@university.edu password: 21331@Qq  
email: rachelreed@university.edu password: 21424@Rr  
email: samscott@university.edu password: 21524@Ss  
email: tinaturner@university.edu password: 22025@Tt

applicant sign ins:

email: MattSmith@gmail.com password: 20524@Ms  
email: LiamJohnson@gmail.com password: 20425@Lj  
email: OliviaWilliams@gmail.com password: 21130@Ow  
email: NoahBrown@gmail.com password: 21030@Nb  
email: AvaJones@gmail.com password: 14531@Aj  
email: ElijahGarcia@gmail.com password: 15330@Eg  
email: SophiaMiller@gmail.com password: 21530@Sm  
email: JamesDavis@gmail.com password: 20224@Jd  
email: IsabellaRodriguez@gmail.com password: 20131@Ir  
email: WilliamMartinez@gmail.com password: 22325@Wm  
email: MiaHernandez@gmail.com password: 20525@Mh  
email: BenjaminLopez@gmail.com password: 15024@Bl  
email: CharlotteGonzalez@gmail.com password: 15125@Cg  
email: LucasWilson@gmail.com password: 20431@Lw  
email: AmeliaAnderson@gmail.com password: 14530@Aa  
email: HenryThomas@gmail.com password: 20024@Ht  
email: HarperTaylor@gmail.com password: 20024@Ht  
email: AlexanderMoore@gmail.com password: 14530@Am  
email: EvelynJackson@gmail.com password: 15331@Ej  
email: MichaelMartin@gmail.com password: 20525@Mm  
email: AbigailLee@gmail.com password: 14524@Al  
email: DanielPerez@gmail.com password: 15224@Dp  
email: EmilyThompson@gmail.com password: 15330@Et  
email: MatthewWhite@gmail.com password: 20524@Mw  
email: EllaHarris@gmail.com password: 15330@Eh  
email: SebastianSanchez@gmail.com password: 21524@Ss  
email: AveryClark@gmail.com password: 14531@Ac  
email: JackRamirez@gmail.com password: 20224@Jr  
email: ScarlettLewis@gmail.com password: 21524@Sl  
email: OwenRobinson@gmail.com password: 21131@Or  
email: GraceWalker@gmail.com password: 15531@Gw  
email: JacksonYoung@gmail.com password: 20224@Jy

admin sign in:
username: admin password: admin

other information:

- rest api and graphql endpoints share the same port (4000), when you run the backend both will be available.
  this means you can run the frontend, admin frontend, and backend and all will function simultaneously, frontend accessing
  the rest endpoint and admin frontend accessing graphql endpoint
- backend validation exists as evidenced in the middlewares folder, however there is no frontend visualising of it because
  front end validation prevents form submissions and requests, stopping backend validation occuring if the input is invalid.

REFERENCING

-RMIT (2025a). Week 3 - Learning Materials and Activities. [online] Canvas. Available at: https://rmit.instructure.com/courses/141509/pages/week-3-learning-materials-and-activities?module_item_id=6962919 [Accessed 10 May 2025].
Lab 03 code archive
Activity 2

-RMIT (2025b). Week 8 - Learning Materials and Activities. [online] Canvas. Available at: https://rmit.instructure.com/courses/141509/pages/week-8-learning-materials-and-activities?module_item_id=6962929 [Accessed 14 May 2025].
Lectorial Week 08 code archive
Example 1

-RMIT (2025c). Week 9 - Learning Materials and Activities. [online] Canvas. Available at: https://rmit.instructure.com/courses/141509/pages/week-9-learning-materials-and-activities?module_item_id=6962931 [Accessed 20 May 2025].
Lectorial Week 09 code archive
Example 1 and example 2

-Mantine (2025). Get started | Mantine. [online] Mantine.dev. Available at: https://mantine.dev/core/package/ [Accessed 7 Jun. 2025].
