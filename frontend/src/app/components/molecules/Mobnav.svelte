<script>

import { formatDate } from './../../helpers/'
import { mdiMenu } from '@mdi/js';
import Modal from './Modal.svelte'
import Aside from './Aside.svelte'

export let title = "APP"

export let user = {
    picture : "https://avatars.dicebear.com/4.5/api/bottts/%7Bmars%7D.svg",
    displayName : "User"
}

export let style = "";

let showMenu = false;

</script>

<style>

    .webnav-container{
        display:flex;
        justify-content: space-between;
        width:100%;
        box-sizing: border-box;
        align-content: center;
        align-items: center;
    }
    
    .avatar-holder{
        border-radius:50%;
        width:4em;
        height:4em;
        overflow:hidden;
        box-sizing: border-box;
        margin-right:1em;
    }

    .avatar-holder img{
        width:100%;
        height:100%;
    }

    b{
        font-size:18px;
        text-align:center;
        width:100%;
        margin-left:2em;
    }

    .user-holder{
        display:flex;
        width:auto;
        align-items: center;
        justify-content: center;
        justify-items: center;
    }

    @media (min-width:1281px) {
        .webnav-container{
            padding: 0em 8em;
        }
    }
</style>


    <div class="webnav-container" {style}>

        <span class="menu" on:click={()=>{ showMenu = true; }}>
            <svg style="width:4em;height:4em" viewBox="0 0 24 24">
                <path fill="#fff" d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
            </svg>
        </span>

        <span class="user-holder">
            <div class="avatar-holder">
                <img src="{user.picture}" alt="{user.displayName}'s profile picture" width="100%" height="100%">
            </div>
        </span>

        <Modal bind:visible={showMenu} style="border-radius:0em 2em 0em 0em;position:fixed;top:0px;right:calc(100vw - 32em);bottom:0px;left:0px" transition="{{ x : -250, duration : 250 }}" index=1 aside>
            <Aside headless></Aside>
        </Modal>
        
        
    </div>
