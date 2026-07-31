const fs = require('fs');
const path = require('path');

const prismaPath = path.join(__dirname, 'schema.prisma');
let content = fs.readFileSync(prismaPath, 'utf8');

// Find all enum names
const enumRegex = /enum\s+(\w+)\s*\{[^}]*\}/g;
const enumNames = [];
let match;
while ((match = enumRegex.exec(content)) !== null) {
  enumNames.push(match[1]);
}

console.log('Found enums:', enumNames);

// Replace provider
content = content.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');

// Replace enum usages with String
for (const enumName of enumNames) {
  const fieldRegex = new RegExp(`(\\b\\w+\\s+)(${enumName})(\\??|\\[\\])?(\\s+.*)?`, 'g');
  content = content.replace(fieldRegex, (m, fieldName, type, modifier, rest) => {
    let newType = 'String';
    if (modifier === '[]') {
      newType = 'String'; // Map array of enums to String for SQLite
    } else if (modifier === '?') {
      newType = 'String?';
    }
    return `${fieldName}${newType}${rest || ''}`;
  });
}

// Remove enum definitions
content = content.replace(/enum\s+(\w+)\s*\{[^}]*\}/g, '');

// SQLite does not support primitive arrays like String[] or Int[]
content = content.replace(/(\b\w+\s+)(String|Int|Float|Boolean)\[\](\s+.*)?/g, '$1String$3');

// Quote uppercase/underscore defaults that are not currently quoted (e.g. @default(ACTIVE) -> @default("ACTIVE"))
content = content.replace(/@default\(([A-Z_]+)\)/g, '@default("$1")');

// SQLite does not support @db.Text or @db.Uuid, etc.
content = content.replace(/@db\.\w+/g, '');

fs.writeFileSync(prismaPath, content, 'utf8');
console.log('Prisma schema converted successfully to SQLite.');
