const urlSlug = require('url-slug');

exports.createPages = async ({actions, graphql, reporter}) => {

    const resultado = await graphql(`
    query{
        allStrapiPaginas{
            nodes{
                nombre
                id
            }
        }
		allStrapiPropiedades{
			nodes{
				nombre
                id
      }
    }
}
    `);

    //console.log(JSON.stringify(resultado.data.allStrapiPropiedades))
    
    // Si no hay resultados
    if(resultado.errors){
        reporter.panic('No hubo resultados', resultado.errors);
    }

    //Si hay resultados generar los archivos estaticos
    const paginas = resultado.data.allStrapiPaginas.nodes;
    const propiedades = resultado.data.allStrapiPropiedades.nodes;

    //Crear los templates para páginas
    paginas.forEach(pagina => {
        //console.log(urlSlug(propiedad.nombre));
        actions.createPage({
            path: urlSlug(pagina.nombre),
            component: require.resolve('./src/components/paginas.js'),
            //id es una variable que se pasa automaticamente al componente
            context:{
                id: pagina.id
            } 
        })
    })

    //Crear los templates de propiedades
    propiedades.forEach(propiedad => {
        //console.log(urlSlug(propiedad.nombre));
        actions.createPage({
            path: urlSlug(propiedad.nombre),
            component: require.resolve('./src/components/propiedades.js'),
            //id es una variable que se pasa automaticamente al componente
            context:{
                id: propiedad.id
            } 
        })
    })

    
}