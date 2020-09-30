let jose = require('node-jose');

let privateKey = `
{
    "p": "wwcoOwlJQKpZVSWGIqQJT0Mu03J-gVdCgvFvB2TMOsAntaso-4ZmItvwP0PxJvYxl41Yc6-rXaOjyL3GeEgolI4agohKKtmMWHvX-HQ6g1gM3ILgSBMfJgIrDN3HAhNGjqVtVgHu1_W3LfomNhg0VXDph_AvuHQqxpjR17yvMuc",
    "kty": "RSA",
    "q": "v7C1kPx_e0a3hdZowzCw6vVcciTW8VEx_H2zhhJhCweNUT0KTUUxqpnNY6D3Cvnr9HrMdnYuKUDu_JDd5W7O90uY8kpHJJk_Z4GEX8UYHf8HWDn2Wm9HLzpH4DBLnIHhhoEq-h8UJhaUlLsq6P9QkHsfJ1DRHDyLpq5pUFvq378",
    "d": "RIbCEAbiwS4CHa83-KzoOMFsqp9iwMsg4NKcGVTD2YdKz8QVgmImAPxFXubEaYqH8JOW2WGt6f1WzFYi_iNmN7i3igJW1SrPhJpjLzH10t0we4P7YLLB4ZUzKfbuSdjaLf547bxFUBCMppeCZiEdqqSsMYUKCgfa9YR3TRFzv73OYjz0wzmpOaQD7_rRNbkAcvPt_Q1fdF1kp4itoEnt5wAa97C6WXysqzStyNf7rufoGmJVzIjVPCemuCxvBTb96g-yRy53K6BbG13k5qUeVsP9_XwIZEoEWjJNv20OWcD5MRHcWOgQ7MFRadjN6Q12MuWmZP_goV9Go_DHiv2XNQ",
    "e": "AQAB",
    "use": "sig",
    "kid": "4ab42a7c-8713-45f8-880c-2c82c1957f51",
    "qi": "isgMBhA-fssr8FDkKa121re3ii5k9qBFIaO4vemhdgm1KhazfiF8Q1nfbtTXKCvI4K9FUcC70fHvhK7DEMBowuAbwQMyJYUQV8wIpJC3BJGciiWo9-Yw5p67rg263yNBKvCQfedkcGdTGW9HTkS55Ab2kL1VEM6NO9yw4fbjHQs",
    "dp": "AQ805L00LKnAOnottFp3wnp28qcYkNNMhTGSjNO7WEZa8N2xJ0yfmWjgcTeJQ9DqjAw0gsxdffC5nwmI3nZl4gizlCnxXTI5VPG3Rp47AyOjTj9XwIx6CtbQLQ23WweHxpaXdXQlO_8Vs6Y8NucCwcQPQLHJUJMw-Es0OJvJx9k",
    "alg": "RS256",
    "dq": "qnAVUD-hndunzAFzDrJZa-ATfY4R62j1V_nwSHJJBMSHO0dZxJCUc4rjGwWBAqpqyOrypxW3P4jztW-dTKV0sl7uM-glT35O6No49-pH4kvinOiUiZ5NncllJQnsANFe0_g_XTuK776-B2xP3_E7EevXLF7oPwH6bY7AJupDcQM",
    "n": "kgj2QjhYknL0N-rvuZU9I8zd5TZpThcSjf5Ccd5DQ3ZIuw54V161ttj4SwVDfQgpcrKnPr7OStR-tg_tY5JBEqEjLTVw91kVw25SRlnDFsaQiLC7-G0JpprjzF93Wm_2mblAF1oA86deKqwSyyC0b__KYDk8Hoy1BFlPleuUKL3kg3eZMgPf1sVmTRPLBcjr4TDm2eHI4UBJkP43zIgNOT5arHZDQugb-X5pl-msQXD5YAdIBVtG_IWKz2vx6TJK52h01pHLzIdlawJ1x62oRf3gwb__78tBQERXnP4ZFTJc38NexydAhE1pA6r5EJrLGpMHspmjeoL_tuO_CDQzWQ"
  }
`;

let header = {
    alg: "RS256",
    typ: "JWT",
    kid: "536e453c-aa93-4449-8e90-add2608783c6"
};

let payload = {
    iss: "1654430003",
    sub: "1654430003",
    aud: "https://api.line.me/",
    exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
    token_exp: 60 * 60 * 24 * 30
};

jose.JWS.createSign({format: 'compact', fields: header}, JSON.parse(privateKey))
    .update(JSON.stringify(payload))
    .final()
    .then(result => {
        console.log(result);
    });