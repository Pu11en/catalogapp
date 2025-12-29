/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
    const productsDir = path.join(__dirname, '../public/products');

    // Recursive function to find all pngs
    function getFiles(dir, allFiles = []) {
        const files = fs.readdirSync(dir);
        for (const f of files) {
            const name = path.join(dir, f);
            if (fs.statSync(name).isDirectory()) {
                getFiles(name, allFiles);
            } else if (f.endsWith('.png')) {
                allFiles.push(name);
            }
        }
        return allFiles;
    }

    const allPngs = getFiles(productsDir);
    console.log(`Found ${allPngs.length} product images in organized folders.`);

    const manualData = {
        "cup-noodles-veggi-manchow.png": {
            sku: "901014-004836",
            name: "Cup Noodles Veggi Manchow - Spicy",
            brand: "Nissin",
            category: "Noodles",
            description: "48 x 70G Pack",
            isFeatured: true,
        },
        "cup-noodles-chilli-chilli.png": {
            sku: "901014-000203",
            name: "Cup Noodles Chilli Chilli Chilli - Super Hot",
            brand: "Nissin",
            category: "Noodles",
            description: "48 x 70G Pack",
        },
        "ijebu-gari.png": {
            sku: "029788-167021",
            name: "Tropical Sun Ijebu Gari",
            brand: "Tropical Sun",
            category: "Grocery",
            description: "6 x 1.5KG Case",
            isNew: true,
        },
        "garam-massala.png": {
            sku: "901588-101207",
            name: "Lalah's Garam Massala",
            brand: "Lalah's",
            category: "Spices",
            description: "24 x 1LB Bulk Pack",
            isFeatured: true,
        },
        "dal-makhani-masala.png": {
            sku: "901588-403226",
            name: "Lalah's Dal Makhani Masala",
            brand: "Lalah's",
            category: "Spices",
            description: "24 x 100G Pack",
        }
    };

    const genericBrands = ["Lalah's", "Tropical Sun", "Nissin", "Spice World", "Island Mix"];
    const categories = ["Spices", "Grocery", "Noodles", "Drinks", "Snacks"];

    console.log('Clearing existing products and related data...');
    await prisma.variant.deleteMany({});
    await prisma.favorite.deleteMany({});
    await prisma.product.deleteMany({});

    console.log('Seeding products...');

    for (const fullPath of allPngs) {
        const fileName = path.basename(fullPath);
        const brandFolder = path.basename(path.dirname(fullPath));
        const manual = manualData[fileName];

        // Determine Brand
        let brand = "Other";
        if (brandFolder === 'nissin') brand = "Nissin";
        else if (brandFolder === 'lalahs') brand = "Lalah's";
        else if (brandFolder === 'tropical-sun') brand = "Tropical Sun";
        else brand = genericBrands[Math.floor(Math.random() * genericBrands.length)];

        // Extract number for generic names
        const numberMatch = fileName.match(/(\d+)/);
        const number = numberMatch ? numberMatch[0] : 'X';

        const sku = manual?.sku || `UPC-${fileName.split('.')[0].toUpperCase()}`;
        const name = manual?.name || `${brand} Item ${number}`;
        const category = manual?.category || categories[Math.floor(Math.random() * categories.length)];
        const description = manual?.description || "Bulk Wholesale Case Pack";

        // Important: The DB path should be relative to 'public'
        const relativePath = fullPath.split('public')[1].replace(/\\/g, '/');

        const product = await prisma.product.upsert({
            where: { sku: sku },
            update: {
                image: relativePath,
                name: name,
                brand: brand
            },
            create: {
                sku: sku,
                name: name,
                brand: brand,
                category: category,
                image: relativePath,
                description: description,
                isFeatured: manual?.isFeatured || false,
                isNew: manual?.isNew || (Math.random() > 0.8),
                stock: Math.floor(Math.random() * 50) + 10,
                variants: {
                    create: {
                        size: description,
                        price: Math.floor(Math.random() * 20) + 15.99,
                        caseQty: 1
                    }
                }
            },
        });
        console.log(`Synced: ${product.name} -> ${relativePath}`);
    }

    console.log('Seeding complete.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
