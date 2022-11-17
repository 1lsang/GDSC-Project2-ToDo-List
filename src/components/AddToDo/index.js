/* eslint-disable class-methods-use-this */
import Component from "../../core/Component"
import styles from "./index.module.css"

export default class AddToDo extends Component {
    template() {
        return `
        <div class="${styles.AddToDo}">
            <input id="input-todo" class="${styles.inputTodo}" type="text" placeholder="할 일"/>
            <button id="add-todo">➕</button>
        </div>
        `
    }

    setEvent() {
        const { addItem } = this.props
        this.addEvent("click", "#add-todo", () => {
            addItem(document.querySelector("#input-todo").value)
        })
        this.addEvent("keypress", "#input-todo", ({ key }) => {
            if (key !== "Enter") return false
            addItem(document.querySelector("#input-todo").value)
        })
    }
}
