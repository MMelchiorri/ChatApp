<script lang="ts">
    import {
        Modal,
        ModalHeader,
        ModalBody,
        ModalFooter,
        Button,
        Form,
        Input,
        Icon,
    } from "sveltestrap";

    export let open: boolean;
    export let toggle: any;
    export let username: string = "";
    export let room: number;
    export let socket: any;
    let current_message = "";

    let array_of_messagge: string[] = [];

    const sendMessage = async () => {
        if (current_message != "") {
            event.preventDefault();
            let message = {
                room: room,
                author: username,
                message: current_message,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", message);
            array_of_messagge = array_of_messagge.concat([message.message]);
        }
    };

    socket.on("receive_message", (data) => {
        array_of_messagge = array_of_messagge.concat([data.message]);
        console.log(array_of_messagge);
    });
</script>

<style>
    
</style>

{#if open && username != ""}
    <Modal isOpen={open} {toggle}>
        <ModalHeader>Chat App</ModalHeader>
        <ModalBody>
            <h3>Welcome {username}</h3>
            {#each array_of_messagge as message}
            <div>
                <p>{message}</p>
            </div>
            {/each}

            <Form class="form-inline mt-5">
                <div class="input-group mb-3">
                    <Input
                        type="text"
                        class="form-control"
                        placeholder="Insert here the message..."
                        bind:value={current_message}
                    />
                    <div class="input-group-append">
                        <Button outline on:click={sendMessage}
                            ><Icon name="chat-text" /></Button
                        >
                    </div>
                </div>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" on:click={toggle}>Close chat</Button>
        </ModalFooter>
    </Modal>
{/if}
