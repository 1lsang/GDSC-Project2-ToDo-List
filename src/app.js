import AddToDo from "./components/AddToDo"
import ToDo from "./components/ToDo"
import Component from "./core/Component"

export default class App extends Component {
    setup() {
        const items = localStorage.getItem("items")
            ? JSON.parse(localStorage.getItem("items"))
            : []
        this.state = {
            items,
        }
    }

    // eslint-disable-next-line class-methods-use-this
    template() {
        return `
            <header component="category"></header>
            <main component="todo"></main>
            <footer component="footer">할일 ${this.state.items.length}개</footer>
        `
    }

    mounted() {
        // const { ToDo, Footer } = this
        const todo = this.target.querySelector('[component="todo"]')

        // eslint-disable-next-line no-new
        // new Todos(todo, {
        //     items: this.state.items,
        //     toggleItem: (id) => this.toggleItem(id),
        //     setText: (id, text) => this.setText(id, text),
        // })
        // eslint-disable-next-line no-new
        new AddToDo(todo, {
            items: this.state.items,
            addItem: (input) => this.addItem(input),
        })

        this.state.items.map(
            (item) =>
                new ToDo(todo, {
                    item,
                    toggleItem: (id) => this.toggleItem(id),
                    updateItem: (id, input) => this.updateItem(id, input),
                    deleteItem: (id) => this.deleteItem(id),
                })
        )
    }

    addItem(input) {
        if (input === "") return false
        const { items } = this.state
        const text = input
        const value = false
        const id = Math.max(0, ...items.map((item) => item.id)) + 1
        this.setState({
            items: [...items, { text, value, id }],
        })
        localStorage.setItem("items", JSON.stringify(this.state.items))
    }

    toggleItem(id) {
        const items = [...this.state.items]
        const index = items.findIndex((v) => v.id === id)

        items[index].value = !items[index].value
        this.setState({ items })
        localStorage.setItem("items", JSON.stringify(this.state.items))
        console.log(this.state)
    }

    updateItem(id, input) {
        if (input === "") {
            this.deleteItem(id)
            return false
        }
        const { items } = this.state
        const index = items.findIndex((item) => item.id === id)
        items[index].text = input
        this.setState({
            items: [...items],
        })
        localStorage.setItem("items", JSON.stringify(this.state.items))
    }

    deleteItem(id) {
        const items = [...this.state.items]
        // const index = items.findIndex((v) => v.id === id)
        // console.log()
        this.setState({ items: items.filter((item) => item.id !== id) })
        localStorage.setItem("items", JSON.stringify(this.state.items))
        console.log(this.state)
    }
}
