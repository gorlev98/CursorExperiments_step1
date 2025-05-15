const axios = require('axios');

describe('FakeStore API Tests', () => {
    let response;
    let defectiveObjects = [];

    beforeAll(async () => {
        response = await axios.get('https://fakestoreapi.com/products');
    });

    test('Response status code should be 200', () => {
        expect(response.status).toBe(200);
    });

    test('Each object should have valid attributes', () => {
        defectiveObjects = [];
        
        response.data.forEach(product => {
            const defects = [];
            
            // Check title
            if (!product.title || product.title.trim() === '') {
                defects.push('Empty or missing title');
            }
            
            // Check price
            if (typeof product.price !== 'number' || product.price < 0) {
                defects.push('Invalid or negative price');
            }
            
            // Check rating.rate
            if (!product.rating || 
                typeof product.rating.rate !== 'number' || 
                product.rating.rate < 0 || 
                product.rating.rate > 5) {
                defects.push('Invalid rating (must be between 0 and 5)');
            }
            
            if (defects.length > 0) {
                defectiveObjects.push({
                    id: product.id,
                    defects: defects,
                    product: product
                });
            }
        });

        // If there are any defective objects, fail the test and show details
        if (defectiveObjects.length > 0) {
            console.log('\nDefective objects found:');
            defectiveObjects.forEach(obj => {
                console.log(`\nProduct ID: ${obj.id}`);
                console.log('Defects:', obj.defects.join(', '));
                console.log('Product details:', JSON.stringify(obj.product, null, 2));
            });
        }

        expect(defectiveObjects).toHaveLength(0);
    });
}); 