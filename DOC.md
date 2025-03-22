<h1>Documentation for Cocktails API</h1>
Also idk if you'll need it but just so you don't have to go through with stupid process of generating a token here have one I used Token: oat_MQ.NUpRTW42V291VjM5cG82S01CaFVFenBseEdWM3J1azA5VkhGWmV1SDk4MTIwMDE5OQ and the link to the hosted service: https://yv76fbf3u3auxumz13629.cleavr.one
<h2>API Routes</h2>
<br>
<h2>Registration and token generation</h2>
POST: /api/register <br> Takes in unique email and password:<br>{"email":"[Unique email]","password":"[User password]"}<br>
Returns created user<br>
---
POST: /api/generatetoken<br>
Takes in email and password of a user:<br>{"email":"wasd","password":"1234"}<br>
Returns:<br>{"user": "[User email]","type": "bearer","value": "[Token]"}

<h2>Cocktails</h2>
POST: /api/cocktails<br>
Takes in name,category_id,instruction: <br>{"name":[name],"category_id":[category_id],"instruction":[instruction]}<br>
Returns generated cocktail<br>
*****
PUT: /api/cocktails/update<br>
Takes in cocktail id,name,instruction,category_id:<br>
{"id":"[Cocktail id]","name":[name],"category_id":[category_id],"instruction":[instruction]}<br>
Returns updated cocktail<br>
***
GET: /api/cocktails/ <br>
Returns all cocktails<br>
***
GET: /api/cocktails/:id <br>
Returns cocktail with given id <br>
***
DELETE: /api/cocktails/:id <br>
Deletes cocktail with given id and returns success message <br>

<h2>Cocktail ingredients</h2>
POST: /api/cocktail_ingredients<br>
Takes in cocktail_id,ingredient_id,amount: <br>{"cocktail_id":[Cocktail id],"ingredient_id":[Category id],"amount":[Amount]}<br>
Returns generated cocktail ingredient<br>
***
PUT: /api/cocktail_ingredients/update<br>
Takes in cocktail ingredient id,name,instruction,category_id:<br>
{"id":"[Cocktail id]","name":[name],"category_id":[category_id],"instruction":[instruction]}<br>
Returns updated cocktail ingredient<br>
***
GET: /api/cocktail_ingredients/ <br>
Returns all cocktail ingredients<br>
***
GET: /api/cocktail_ingredients/:id <br>
Returns cocktail ingredient with given id <br>
***
DELETE: /api/cocktail_ingredients/:id <br>
Deletes cocktail ingredient with given id and returns success message <br>





  

