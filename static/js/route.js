(() => {
    
    const baseUrl = "http://127.0.0.1:5500"
    let location = window.location.pathname
    let activeRoute = location.substring(0, window.location.pathname.lastIndexOf('/'));
    let module = activeRoute.split('/')[2]
    let file = location.substring(window.location.pathname.lastIndexOf('/'), location.length);
    
    if(file == '/add.html'){
        reqFormAdd()
    }

    fetch(`${baseUrl}/routes.json`)
    .then(response => response.json())
    .then(data => {
        let menu = document.querySelector('.dropdown-menu')
        let menuItems = []
        let routers = data;
        let activeParentRoute = '/'+activeRoute.split('/')[1]
        routers = routers.filter( route => {
            if (route.path == activeParentRoute){
                return route.child
            }
        })
        routers[0].child.forEach((route) => {
            menuItems.push(`<li><a href="${routers[0].path+route.path}">${route.name}</a></li>`)
        })
        menu.innerHTML = menuItems.join('')
    })
    .catch(error => console.log('Error loading routes:', error));

    fetch(`${baseUrl}${activeRoute}/data.json`)
    .then( res => res.json())
    .then ( data => {
        if(file != '/') file = 'Tambah'
        else file = ''
        document.title = 'Simurgh - '+data.name
        document.querySelector('.breadcrumbs').innerHTML = `
                <a href="/portal">Portal</a> / <a href="${activeRoute}">${data.name}</a> / ${file}
        `
        let filter = document.querySelector('.filter')
        if(filter){
            filter.innerHTML = `
                <input type="text" id="${data.name}" name="${data.name}" placeholder="${data.name}" th:attr="value=${data.name}">
                <input type="text" placeholder="&#xf002;  Table name">
                <button class="filter-button" type="submit">
                    Search
                </button>`
        }
        
        let table = document.querySelector('.table-container')
        if(table){
            console.log(table)
            let tbody = document.querySelector('tbody')
            let ths = ['<th></th>']
            data.tableColumn.map( col => {
                ths.push(`<th>${col.name}</th>`)
        
            })
            document.querySelector('thead').innerHTML = `<tr>${ths.join('')}</tr>`
            tbody.innerHTML = data.data.map(d => {
                return `<tr>
                    <td class="action" style="width: 20%; text-align: center;">
                        <a href="edit.html?id=${d.id}" class="action-button update-button">
                            <i class="fas fa-edit" aria-hidden="true"></i> edit
                        </a>
                        <a href="delete.html?id=${d.id}" class="action-button delete-button">
                            <i class="fa fa-trash" aria-hidden="true"></i> delete
                        </a>
                        <a class="action-button detail-button" href="shows.html?id=${d.id}">
                            <i class="fa fa-info-circle" aria-hidden="true"></i> lihat
                        </a>
                    </td>
                    ${data.tableColumn.map(key => `<td>${d[key.key]}</td>`).join('')}
                    </tr>`;
            }).join('');
        }
    })

    function reqFormAdd(){
        let form = [
            {
                name: 'nama',
                type: 'text',
                label: 'Nama',
                placeholder: 'Masukkan nama',
                required: true
            }
        ]
    }
})()