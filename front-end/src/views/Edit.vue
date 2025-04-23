<template>
    <div>
        <h1>Thông's dictionary - Edit Word</h1>
        <word-form @createOrUpdate="createOrUpdate" :word=this.word></word-form>
    </div>
</template>

<script>
    import WordForm  from '../components/WordForm.vue';
    import { api } from '../helpers/helpers.js';
    
    export default{
        name: 'edit',
        components: {
            'word-form':WordForm
        },
        data: function() {
            return {
                word: {}
            };
        },
        async mounted() {
            try {
                this.word = await api.getWord(this.$route.params.id);
            } catch (err) {
                console.error('Error fetching word:', err);
            }
        },
        methods:{
            createOrUpdate: async function(word){
                await api.updateWord(word);
                this.flash('Word updated successfully!', 'success');
                this.$router.push(`/words/${word._id}`);
            }
        }
    }
</script>