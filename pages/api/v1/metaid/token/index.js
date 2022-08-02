import { HABY_LABS_ADDRESS, WEBSITE_URL, COPY } from '../../../../util/constants';

export default async function handler(req, res) {
  console.log(process.env);

  const metadata = {
    name: COPY.title,
    description: `${COPY.heroSubheading}. <br><br> Follow along on twitter [@HabyLabs](https://twitter.com/HabyLabs). Mint one at [metaid.quest](https://metaid.quest/) `,
    image: `https://${WEBSITE_URL}/logo.png`,
    external_link: `https://${WEBSITE_URL}`,
    seller_fee_basis_points: 800, // 8%,
    fee_recipient: HABY_LABS_ADDRESS,
  };

  res.send(metadata);
}
