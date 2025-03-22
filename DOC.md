<h1>Documentation for Cocktails API</h1>
Also idk if you'll need it but just so you don't have to go through with stupid process of generating a token here have one I used Token: oat_MQ.NUpRTW42V291VjM5cG82S01CaFVFenBseEdWM3J1azA5VkhGWmV1SDk4MTIwMDE5OQ and the link to the hosted service: https://yv76fbf3u3auxumz13629.cleavr.one
<h2>API Routes</h2>
<br>
<h2>Registration and token generation</h2>
POST: /api/register <br> Takes in unique email and password:<br>{"email":"[Unique email]","password":"[User password]"}<br>
Returns created user

***
POST: /api/generatetoken<br>
Takes in email and password of a user:<br>{"email":"wasd","password":"1234"}<br>
Returns:<br>{"user": "[User email]","type": "bearer","value": "[Token]"}
<br>
<h2>Cocktails</h2>
POST: /api/cocktails<br>
Takes in name,category_id,instruction: <br>{"name":[name],"category_id":[category_id],"instruction":[instruction]}<br>
Returns generated cocktail
***
PUT: /api/cocktails/update<br>
Takes in cocktail id,name,instruction,category_id:<br>
  

