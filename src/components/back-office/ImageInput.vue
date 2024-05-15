<script setup lang="ts">
    import { faUpload } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { computed, ref } from 'vue';

    const ALLOWED_UPLOAD_CONTENT_TYPES = ['image/jpg', 'image/png', 'image/jpeg', 'image/gif', 'image/svg'];

    const props = defineProps<{
        file: File,
        alt: string
    }>();

    const imagePreviewURL = computed(() => URL.createObjectURL(props.file));
    const isDragging = ref(false);

    const emit = defineEmits([
        "upload"
    ]);

    function dropFile(e: DragEvent) {
        if (!e.dataTransfer) return;
        const file = e.dataTransfer.files[0];

        if (isValidType(file)) {
            emit("upload", e.dataTransfer.files[0]);
        }

        isDragging.value = false;
    }

    function selectFile(e: Event) {
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length === 1 && isValidType(fileInput.files[0])) {
            emit("upload", fileInput.files[0]);
        }
    }

    function isValidType(file: File) {
        return ALLOWED_UPLOAD_CONTENT_TYPES.includes(file.type);
    }
</script>

<template>
    <div class="image-upload" @dragover.prevent="isDragging = true" @dragleave.stop="isDragging = false" @drop.prevent="dropFile">
        <img :src="imagePreviewURL" :alt="alt">
        <div>
            <p><FontAwesomeIcon :icon="faUpload" /> Drag and drop to upload</p>
            <label for="image">
                <span class="drag-overlay" v-if="isDragging">
                    <span><FontAwesomeIcon :icon="faUpload" /> Drop to upload</span>
                </span>
                <span class="button" v-else>Select file</span>
            </label>
            <input type="file" name="image" id="image" @change="selectFile">
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .image-upload {
        position: relative;
        display: inline-flex;
        gap: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        border: .2rem solid var(--color-background-surface);

        img {
            height: 10rem;
            pointer-events: none;
        }

        div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;

            p {
                font-style: italic;
            }

            svg {
                margin-right: .5rem;
            }
        }

        input {
            opacity: 0;
            overflow: hidden;
            position: absolute;
            width: 1px;
            height: 1px;
        }

        .drag-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--color-background-surface);
            font-size: 1.4rem;
            pointer-events: none;

            span {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                text-align: center;
            }
        }
    }
</style>
