<script setup lang="ts">
    import { logout, profile } from '@/modules/api-services/auth';
    import router from '@/router';
    import { faArrowRightFromBracket, faBurger, faCarrot } from '@fortawesome/free-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { ref } from 'vue';
    import LocaleButton from '@/components/LocaleButton.vue';
    import { translate } from '@/modules/core/localization';

    const username = ref("");
    profile().then(res => username.value = res.name);
</script>

<template>
    <header>
        <h1>
            <span>Boorgir</span> admin
        </h1>
        <nav>
            <ul>
                <li>
                    <RouterLink to="/admin/ingredients">
                        <FontAwesomeIcon :icon="faCarrot" />
                        <span>{{ translate("backoffice.sidebar.nav.ingredients") }}</span>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/admin/burgers">
                        <FontAwesomeIcon :icon="faBurger" />
                        <span>{{ translate("backoffice.sidebar.nav.burgers") }}</span>
                    </RouterLink>
                </li>
            </ul>
        </nav>
        <div id="profile">
            <LocaleButton />
            <p>
                {{ translate("backoffice.sidebar.profile.text") }} <strong>{{ username }}</strong>
            </p>
            <button :title="translate('backoffice.sidebar.profile.logout')" @click="logout().then(() => router.push('/'))">
                <FontAwesomeIcon :icon="faArrowRightFromBracket" />
            </button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
    $padding: 2rem;

    header {
        position: relative;
        display: inline-block;
        width: 23rem;
        height: 100%;
        background-color: var(--color-background-mute);
    }

    h1 {
        text-align: center;
        padding: $padding;

        span {
            font-weight: bold;
        }
    }

    nav ul {
        list-style: none;
        padding: 0;

        a {
            $iconSize: 1.5rem;
            $arrowOffsetRight: 1.2rem;
            position: relative;
            display: flex;
            padding: $padding * .7 $padding;
            font-size: $iconSize;
            align-items: center;
            gap: 1rem;
            transition: background-color .3s ease-in-out;

            &::after {
                content: '';
                display: block;
                position: absolute;
                right: $padding + .2rem;
                width: $iconSize * .8;
                height: $iconSize * .8;
                transform: rotate(45deg);
                border: .3rem solid gray;
                border-bottom: none;
                border-left: none;
                margin-right: $arrowOffsetRight;
                transition: margin-right .3s ease-in-out;
            }

            &:hover::after {
                margin-right: $arrowOffsetRight - .5rem;
            }

            &.router-link-active {
                background-color: var(--color-background-surface);

                &::after {
                    margin-right: 0;
                }
            }

            span {
                font-size: 1.2rem;
            }
        }
    }

    #profile {
        display: flex;
        position: absolute;
        align-items: center;
        gap: 1.3rem;
        bottom: 0;
        width: 100%;
        padding: $padding;

        p {
            flex: 1;

            strong {
                display: block;
                font-weight: bold;
                font-size: 1.6rem;
                line-height: 1.6rem;
            }
        }
        button {
            font-size: 2rem;
        }
    }
</style>../LocaleButton.vue
