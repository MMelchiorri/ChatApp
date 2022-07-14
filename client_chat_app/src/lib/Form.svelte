<script lang="ts">
    import { Form, FormGroup, Label, Input, Button } from "sveltestrap";
    import Chat from "./Chat.svelte";
    let open = false;
    let username = "";
    let room;

    import io from "socket.io-client";

    const socket = io("http://localhost:3001");

    let toggle = () => {
        if (room != undefined && username != "") {
            event.preventDefault();
            open = !open;
            socket.emit("join_room",room)
            }
        
    };
</script>

<div class="container">
    <Form class="col-12 col-sm-4 offset-4 mt-5">
        <Label for="username">Username</Label>
        <Input
            type="text"
            bind:value={username}
            placeholder="insert here your username..."
        />

        <Label for="username">Room</Label>
        <Input type="text" placeholder="insert here the room..." bind:value={room} />

        <Button
            class="col-12 col-sm-2 offset-4"
            color="primary"
            on:click={toggle}>Submit</Button
        >
    </Form>

    <Chat {open} {toggle} {username} {room} {socket} />
</div>
