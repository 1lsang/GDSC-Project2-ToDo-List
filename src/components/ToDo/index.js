import Component from "../../core/Component"
import styles from "./index.module.css"

export default class ToDo extends Component {
    setup() {
        this.state = {
            modify: false,
        }
    }

    template() {
        const { text, value, id } = this.props.item
        const { modify } = this.state
        return `<div class="${styles.todo}" id="todo-${id}">
                    <button class="toggle-btn ${styles.toggleButton}">${
            value ? "✅" : "⬜️"
        }</button>
                    
                    ${
                        modify
                            ? `<input type="text" value="${text}" class="${styles.todoContent}" id="update-todo-${id}"/><button class="update-btn">📝</button>`
                            : `<span class="todo-content ${styles.todoContent}">${text}</span>`
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
        this.addEvent("click", ".todo-content", () => {
            this.setState({ ...this.state, modify: true })
            document.querySelector(`#update-todo-${id}`).select()
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
