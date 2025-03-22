<h1>Documentation for Cocktails API</h1>
<p>Also idk if you'll need it but just so you don't have to go through with stupid process of generating a token here have one I used Token: oat_MQ.NUpRTW42V291VjM5cG82S01CaFVFenBseEdWM3J1azA5VkhGWmV1SDk4MTIwMDE5OQ and the link to the hosted service: https://yv76fbf3u3auxumz13629.cleavr.one</p>
<h2>API Routes</h2>
<br>
<h2>Registration and token generation</h2>
<p>POST: /api/register <br> Takes in unique email and password:<br>{
    "email":"wasd",
    "password":"1234"
}<br>
Returns user in json format:<br>{{"email": "wasaasasassada","createdAt": "2025-03-22T21:24:47.037+00:00","updatedAt": "2025-03-22T21:24:47.038+00:00","id": 2}}
<p>
<p>POST: /api/generatetoken<br>
Takes in email and password of a user:<br>{"email":"wasd","password":"1234"}<br>
Returns:<br>{"user": "wasaasasassada","type": "bearer","value": "oat_MQ.NUpRTW42V291VjM5cG82S01CaFVFenBseEdWM3J1azA5VkhGWmV1SDk4MTIwMDE5OQ"}</p>
<br>
<h2>Cocktails</h2>
<p>Post: /api/cocktails<br>
Takes in name,category_id,instruction: <br>{"name":[name],"category_id":[category_id],"instruction":[instruction]}</p>

<p>/<p>
