<template>
    <div>
        <h1>Thông's dictionary - Words</h1>
        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th>
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word, i) in words" :key="i">
                    <td>{{ word.english }}</td>
                    <td>{{ word.german }}</td>
                    <td>{{ word.vietnamese }}</td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'show', params: { id: word._id } }">Show</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'edit', params: { id: word._id } }">Edit</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <a href="#" @click.prevent="onDestroy(word._id)">Delete</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { api } from '../helpers/helpers.js';

export default {
    name: 'Words',
    data() {
        return {
            words: []
        };
    },
    async mounted() {
        try {
            this.words = await api.getWords();
        } catch (err) {
            console.error('Error fetching words:', err);
            this.flash('Error fetching words. Please try again.', 'error');
        }
    },
    methods: {
        async onDestroy(id) {
            try {
                const sure = window.confirm('Are you sure you want to delete this word?');
                if (!sure) return;
                await api.deleteWord(id);
                this.flash('Word deleted successfully!', 'success');
                this.words = this.words.filter(word => word._id !== id);
            } catch (err) {
                console.error('Error deleting word:', err);
                this.flash('Error deleting word. Please try again.', 'error');
            }
        }
    }
};
</script>

<style scoped>
.center.aligned {
    text-align: center;
}
</style>