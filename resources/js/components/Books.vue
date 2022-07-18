<template>
    <div class="container">
        <h3>Иерархия</h3>
        <div>
             <div class="row border-top pt-2" v-for="(childrens, ii) in showgenres">
                <span v-for="(children, jj) in childrens">{{children}} =></span>
             </div>
        </div>
    </div>
</template>

<script>
    const genres = [
        {
            title: "Легкое чтение",
            children: [
            {
                title: "Фантастика",
                children: [
                { title: "Киберпанк", children: [
                    { title: "Book1", children: [] },
                    { title: "Book2", children: [] }
                ] },
                { title: "Попаданцы", children: [] }
                ]
            }
            ]
        },
        {
            title: "Бизнес-книги",
            children: [
            {
                title: "Экономика",
                children: [{ title: "Управление экономикой", children: [] }]
            },
            { title: "Менеджмент", children: [
                { title: "Book3", children: [] },
                { title: "Book4", children: [] }
            ] }
            ]
        },
        { title: "Самиздат", children: [] }
    ];
    const getchildren = function(json){
        childrens[level].push(json.title);
        let levelchildren = [...childrens[level]];

        if(json.children && json.children.length > 0){
            for(let ch = 0; ch < json.children.length; ch++){
                if(ch > 0){
                    childrens[level + 1] = [...levelchildren];
                    level++;
                }
                getchildren(json.children[ch]);
            }
        }
    }

    let childrens = [];
    let level  = -1;

    export default {
    computed: {
        showgenres(){

            for(let children = 0; children < genres.length; children++){
                level++;
                childrens[level] = [];
                getchildren(genres[children]);
            }

            return childrens;
        },
    },
}
</script>
