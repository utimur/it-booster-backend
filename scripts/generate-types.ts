import { getDMMF } from '@prisma/sdk';
import { writeFileSync, readFileSync } from 'fs';
const path = require('path');

const schemaPath = path.resolve(__dirname, '../prisma/schema.prisma');
const outputPath = path.resolve(__dirname, '../prisma/schema/schema-types.ts');

async function generate() {
    const schema = readFileSync(schemaPath, 'utf-8');
    const dmmf = await getDMMF({ datamodel: schema });

    const models = dmmf.datamodel.models;
    const enums = dmmf.datamodel.enums;

    const enumTypes = enums
        .map((e) => {
            const members = e.values
                .map((v) => `  ${v.name} = "${v.name}"`)
                .join(',\n');
            return `export enum ${e.name} {\n${members}\n}`;
        })
        .join('\n\n');

    const modelTypes = models
        .map((model) => {
            const fields = model.fields.map((field) => {
                const isRelation = field.kind === 'object';
                const optional = isRelation || !field.isRequired ? '?' : '';
                const isArray = field.isList;
                const tsType = prismaToTsType(field.type, enums);

                return `  ${field.name}${optional}: ${tsType}${isArray ? '[]' : ''};`;
            });

            return `export interface ${model.name} {\n${fields.join('\n')}\n}`;
        })
        .join('\n\n');

    const banner = `// This file is auto-generated from schema.prisma\n\n`;

    writeFileSync(outputPath, banner + enumTypes + '\n\n' + modelTypes);
    console.log(`✅ Generated types to ${outputPath}`);
}

function prismaToTsType(prismaType: string, enums: { name: string }[]): string {
    const typeMap: Record<string, string> = {
        String: 'string',
        Int: 'number',
        BigInt: 'bigint',
        Float: 'number',
        Decimal: 'number',
        Boolean: 'boolean',
        DateTime: 'Date',
        Json: 'any',
        Bytes: 'Buffer',
    };

    if (typeMap[prismaType]) return typeMap[prismaType];

    const isEnum = enums.some((e) => e.name === prismaType);
    if (isEnum) return prismaType;

    return prismaType; // связанная модель
}

generate();
