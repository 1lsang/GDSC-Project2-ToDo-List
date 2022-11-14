import Component from "../../core/Component"

export default class ToDo extends Component {
    setup() {
        this.state = {
            modify: false,
        }
    }

    template() {
        const { text, value, id } = this.props.item
        const { modify } = this.state
        return `<div id="todo-${id}">
                    <button class="toggle-btn">${value ? "✅" : "⬜️"}</button>
                    
                    ${
                        modify
                            ? `<input type="text" value="${text}" id="update-todo-${id}"/><button class="update-btn">📝</button>`
                            : `<span>${text}</span><button class="modify-btn">📝</button>`
                    }
                    
                    <button class="delete-btn">❌</button>
                </div>`
    }

    setEvent() {
        const { toggleItem, updateItem, deleteItem } = this.props
        const { id } = this.props.item

        this.addEvent("click", ".toggle-btn", () => {
            toggleItem(id)
        })
        this.addEvent("click", ".modify-btn", () => {
            this.setState({ ...this.state, modify: true })
        })

        this.addEvent("click", ".update-btn", () => {
            updateItem(id, document.querySelector(`#update-todo-${id}`).value)
            this.setState({ ...this.state, modify: false })
        })
        this.addEvent("keypress", `#update-todo-${id}`, ({ key }) => {
            if (key !== "Enter") return false
            updateItem(id, document.querySelector(`#update-todo-${id}`).value)
            this.setState({ ...this.state, modify: false })
        })

        this.addEvent("click", ".delete-btn", () => {
            deleteItem(id)
        })
    }
}
