/* eslint-disable class-methods-use-this */
import Component from "../../core/Component"

export default class AddToDo extends Component {
    template() {
        return `
        <input id="input-todo" type="text" placeholder="할 일"/>
        <button id="add-todo">➕</button>
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
