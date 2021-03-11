const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll(".container");

// console.log('hello',draggables,containers)
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        console.log("drag")
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container,e.clientY)
        console.log(afterElement)
        const draggable = document.querySelector('.dragging');
        if(afterElement == null) {
            container.appendChild(draggable)
        }        
        else {
            container.insertBefore(draggable, afterElement)
        }
    })
})

function getDragAfterElement(container,y) {
    const draggableElement = [...container.querySelectorAll('.draggable:not(.dragging)')]
    draggableElement.reduce((closest,child) => {
        const box = child.getBoundingClientRect()
        console.log(box)
        const offset = y - box.top - box.height/2
        if(offset < 0 && offset > closest.offset) {
            return { offset : offset, element : child}
        }
        else {
            return closest
        }
    }, {offset: Number.POSITIVE_INFINITY}).element

}