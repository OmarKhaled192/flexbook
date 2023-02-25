# flexbook
social media app having some functionality from the original facebook
## logging page same as facebook
![login](https://user-images.githubusercontent.com/94392724/221361754-54214e41-3db2-4ec9-a608-9c3f195b542e.png)
## firstly we create an account on my flexbook app:
![createAccount](https://user-images.githubusercontent.com/94392724/221361896-9d0093cf-5893-458d-9b9e-f1b0343ba829.png)
## then we can test validations on every boxes
- after filling data in the form

![fillform](https://user-images.githubusercontent.com/94392724/221362520-37c28ae2-28e2-4e17-8698-4c2d893cd581.png)

- then we have here some mistakes:
  1. email is not valid.
  2. password is very weak.
  3. age < 12 year, then cannot create account (should be at least >= 12 year).
  
  ## if we click on sign up button:
  ![check1](https://user-images.githubusercontent.com/94392724/221362798-c29ebcb2-2f54-4c1a-b579-378f781a4894.png)
  
 - then an alret warning message showing to user to check firstly on the essential data => ( validated email, allowed age ) to continue my steps.
 - this alret message should be hidden after 15 second (to be not annoyed the user for a long of time).
 
### we tried here to solve the two problems showed in the alert, but password still very weak
![check2](https://user-images.githubusercontent.com/94392724/221363581-a27219a5-5628-41a4-979d-e65b2920637d.png)

 ## after solving the two problems then we get the third problem here that password is not valid
 ![passNotValid](https://user-images.githubusercontent.com/94392724/221364151-ebfe1515-1b1d-4cf5-89ed-a31eeede7707.png)

## then we try to write strong password having the same rule showed in the alert message, but let the second password not identical !!
![NotIdPass](https://user-images.githubusercontent.com/94392724/221364923-368f2889-1f93-4433-bdb6-1024084f7fc4.png)

## the result that now we have two warnings about the password the confirmed passord is not identical with the first password & the identical password is not a valid password also
![alert-message-of-notID](https://user-images.githubusercontent.com/94392724/221364986-4b7611bb-0788-4d38-a022-a955389341d9.png)

## after we solving this problem:
![validdata](https://user-images.githubusercontent.com/94392724/221365135-2522b7fe-9e64-486d-a8a3-00c5d93e3189.png)
