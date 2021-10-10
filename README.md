# Ionic Stripe Store

An Ionic/Angular based e-commerce/cart system powered by Stripe Products and AWS Amplify. Features include:

 - Angular Material UI
 - Simple AWS Amplify powered REST API for Stripe interaction
 - Stripe hosted checkout integration (via AWS Amplify/Lambda)
 - Fully powered by Stripe Products (no CMS needed)
 - Full cart system with Angular components using local storage

## ToDo:

 - Account/Authentication (currently just check-out as guest)
 - Ability to utilize Subscriptions 

# Getting Started

```
git clone git@github.com:mlabieniec/AngularStripeStore.git
cd AngularStripeStore && npm i
amplify init
```

- You'll need AWS keys for Amplify, see the Getting Started guide at [docs.amplify.aws](https://docs.amplify.aws)
- You'll also need Stripe API keys added to `src/environments`
- Finally, add Stripe API keys to the backend `amplify/backend/function/plumea8bb0b79/plumea8bb0b79-cloudformation-template.json` "stripeKey" property.

> Don't forget to add `src/environments` to `.gitignore` if you add your stripe keys and commit to github!

# License
GPL V3, see [LICENSE](LICENSE)