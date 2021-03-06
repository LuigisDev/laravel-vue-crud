// var urlUsers = 'https://jsonplaceholder.typicode.com/users';
new Vue({
    el: '#crud',
    created: function() {
        this.getKeeps();
    },
    data: {
        keeps: [],
        newKeep: '',
        fillKeep: { 'id': '', 'keep': '' },
        errors: [],
    },
    methods: {
        getKeeps: function() {
            var urlKeeps = 'tasks';

            axios.get(urlKeeps).then((response) => {
                this.keeps = response.data;
            }).catch((err) => {
                alert('Algo ocurrio al listar' + err);
            });
        },
        editKeep: function(keep) {
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;
            $('#edit').modal('show');
        },
        updateKeep: function(id) {
            // alert(id);
            var url = 'tasks/' + id;

            axios.put(url, this.fillKeep).then((response) => {
                this.getKeeps();
                this.fillKeep = { 'id': '', 'keep': '' };
                this.errors = [];
                $('#edit').modal('hide');
                toastr.success('Tarea actualizada...');
            }).catch((error) => {
                this.errors = error.response.data;
            });
        },
        deleteKeep: function(keep) {
            if (confirm('Realmente desea elimiar esta tarea')) {
                console.log(keep.id);
                var url = 'tasks/' + keep.id;

                axios.delete(url).then((response) => {
                    this.getKeeps();
                    toastr.success('Eliminado correctamente');
                }).catch((err) => {
                    alert('Algo ocurrio al eliminar' + err);
                });
            }
        },
        createKeep: function() {
            var url = 'tasks';
            axios.post(url, {
                keep: this.newKeep
            }).then((response) => {
                this.getKeeps();
                this.newKeep = '';
                this.errors = [];
                $('#create').modal('hide');
                toastr.success('Tarea creada...');
            }).catch((err) => {
                // alert('Algo ocurrio al crear' + err);
                this.errors = error.response.data;
            });
        }
    }
});