<template>
    <div>
        <h1>Thông's dictionary - Show Word</h1>

        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="germany flag"></i> German
            </div>
            <input type="text" readonly :value="word.german" />
        </div>
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="united kingdom flag"></i> English
            </div>
            <input type="text" readonly :value="word.english" />
        </div>
        <div class="ui labeled input fluid">
            <div class="ui label">
                <i class="vietnam flag"></i> Vietnamese
            </div>
            <input type="text" readonly :value="word.vietnamese" />
        </div>   
        <div class="actions">
            <router-link :to="{ name: 'edit', params: { id: $route.params.id } }">
                Edit word
            </router-link>
        </div>
    </div>
</template>

<script>
import { api } from '../helpers/helpers.js';

export default {
    name: 'show',
    data() {
        return {
            word: {
                german: '', // Default value
                english: '', // Default value
                vietnamese: '' // Default value
            }
        };
    },
    async mounted() {
        try {
            this.word = await api.getWord(this.$route.params.id);
        } catch (err) {
            console.error('Error fetching word:', err);
        }
    }
};
</script>

<style scoped>
.actions a {
    display: block;
    text-decoration: underline;
    margin: 20px 10px;
}
</style>