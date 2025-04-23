<template>
    <div>
        <h1>Thông's dictionary - Create a New Word</h1>
        <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers.js';

export default {
    name: 'new-word',
    components: {
        'word-form':WordForm
    },
    methods: {
        createOrUpdate: async function(word) {
            try {
                const res = await api.createWord(word);
                if (res && res._id) {
                    this.flash('Word created successfully!', 'success');
                    this.$router.push(`/words/${res._id}`);
                } else {
                    throw new Error('Failed to create word: Invalid response from server.');
                }
            } catch (err) {
                console.error('Error creating word:', err);
                this.flash('Error creating word. Please try again.', 'error');
            }
        }
    }
};
</script>