(()=>{
    const baseUrl = "http://127.0.0.1:5500"
    let activeRoute = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    
    fetch(`${baseUrl}/routes.json`)
    .then(response => response.json())
    .then(data => {
        let menu = document.querySelector('.menu')
        let menuItems = [
            `<div>
                <a href="/portal">Portal</a>
            </div>`
        ]
        let routers = data;
        let activeParentRoute = '/'+activeRoute.split('/')[1]
        routers = routers.filter( route => {
            if (route.path == activeParentRoute){
                return route.child
            }
        })
        routers[0].child.forEach((router) => {
            menuItems.push(`<div>
                <a href="${activeParentRoute}${router.path}">${router.name}</a>
            </div>`)
        })
        menuItems = menuItems.map(item => {
            if (item.includes(`href="${activeRoute}"`)) {
                return item.replace('<div>', '<div class="active">');
            }
            return item;
        });
        menu.innerHTML = menuItems.join('')
    })
    .catch(error => console.log('Error loading routes:', error));

    fetch(`${baseUrl}${activeRoute}/data.json`)
    .then( res => res.json())
    .then ( data => {
        document.title = 'Simurgh - '+data.name
        let selectSearch = document.querySelector('.select-search')
        let options = data.data.map( d => {
            return `<option value="${d.kode}">${d.name}</option>`
        })
        let select = `<select name="nama-perusahaan" id="nama-perusahaan">
                            ${options}
                        </select>
                        <input type="text" name="search" id="search" placeholder="Cari ${data.name}"/>`
        selectSearch.innerHTML = select

        document.querySelector('.breadcrumbs').innerHTML = `
                <a href="/portal">Portal</a> ${data.name}
        `
        
        let tbody = document.querySelector('tbody')
        let ths = data.tableColumn.map( col => {
            return `<th>${col.name}</th>`
    
        })
        document.querySelector('thead').innerHTML = `<tr>${ths.join('')}</tr>`
        tbody.innerHTML = data.data.map(d => {
            return `<tr>
                <td class="action">
                    <button>Hapus</button>
                    <button>Ubah</button>
                    <button>Lihat</button>
                </td>
                ${Object.keys(d).map(key => `<td>${d[key]}</td>`).join('')}
                </tr>`;
        }).join('');
    })
})()    