import * as babel from '@babel/standalone';
import type { NodePath, types as BabelTypes } from '@babel/core';
import { p5scopeFuncs, p5vars, p5funcs, p5Instance } from './p5-reference';

export async function convert(code: string, instance: string) {

  try {
    const wrapP5Functions = function (babel: any) {
      const { types: t } = babel;

      return {
        visitor: {
          FunctionDeclaration(path: NodePath<BabelTypes.FunctionDeclaration>) {
            const node = path.node;
            if (!node || !node.id) return;
            if (p5scopeFuncs.includes(node.id.name)) {
              const bodyCode = babel.transformFromAstSync(t.program([node.body])).code;
              path.replaceWithSourceString(`${instance}.${node.id.name} = function() ${bodyCode}`)
            }
          },
          Identifier(path: NodePath<BabelTypes.Identifier>) {
            const node = path.node;
            if ([...p5vars, ...p5funcs].includes(node.name)) {
              if (path.parent.type !== 'MemberExpression' || ['pixels', 'drawingContext'].includes(node.name)) {
                node.name = `${instance}.${node.name}`
              }
            } else if ([...p5Instance].includes('p5.' + node.name)) {
              if (path.parent.type === 'MemberExpression' && path.parent.object.type === 'Identifier') {
                path.parent.object.name = instance;
              }
            }
          }
        }
      };
    }

    const output = babel.transform(code, {
      presets: ["es2017"], plugins: [
        wrapP5Functions
      ],
    });

    return output.code ?? '';

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }

}

