const  postCard  = require('../../src/functions/postCard');
const eventGenerator = require('../testUtils/eventGenerator');
const validators = require('../testUtils/validators');

describe('create credit card', () => {
    test('it shoudld take a body and return an API Gateway response', async () => {
        const event = eventGenerator({
            body: {
                card_number: 36000100000106,
                cvv:1234,
                expiration_month:"12",
                expiration_year:"2023",
                email:"asvsad@gmail.com",
              },
        });

        const res = await postCard(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(true);
    });
});
