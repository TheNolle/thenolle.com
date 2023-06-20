export default {
    name: 'hello',
    description: 'The classic hello world',
    usage: 'hello',
    async execute(): Promise<string> {
        return 'Hello, World!'
    }
}