import antlr4  from 'antlr4'
import CypherLexer from './cypher/CypherLexer.js'
import CypherParser from './cypher/CypherParser.js'
import CypherParserListener from './cypher/CypherParserListener.js'


// 测试语句
const cypherQuery1 = `MATCH (n) RETURN n;`
const cypherQuery2 = `MATCH (n)-[r]->(m) RETURN n,r,m;`
const cypherQuery3 = `MATCH (n {name: 'John'})-[:FRIEND]-(friend)
WITH n, count(friend) AS friendsCount
WHERE friendsCount > 3
RETURN n, friendsCount;`

// 生成抽象语法树
const chars = new antlr4.InputStream(cypherQuery1)
const lexer = new CypherLexer(chars)
const tokens = new antlr4.CommonTokenStream(lexer)
const parser = new CypherParser(tokens)
const tree = parser.query()