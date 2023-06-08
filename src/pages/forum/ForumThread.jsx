import { useRef } from "react"
import ForumPost from "../../components/ForumPost"
import { Form, Link, useLoaderData, useActionData, useNavigation, useParams } from 'react-router-dom'


import { 
    getPosts,
    replyPost, 
} from "../../appwrite"

export async function loader({params}) {
    console.log("loaderFn", params)
    try {
        const data = getPosts(params.section, params.post)
        console.log("forumThreadLoader", data)
        return data
    } catch(e) {
        console.log("forumThreadLoader error", e)
    }
    return null
}

export async function action({ params, request }) {
    const formData = await request.formData()
    const post = formData.get("reply")
    try {
        const data = await replyPost(params.section, {post, threadID: params.post})
        console.log(data)
        return { success: "Reply posted!" }
    } catch(error) {
        console.log(error)
        return error.message
    }
}

export default function ForumThread() {
    const loaderData = useLoaderData()
    const actionData = useActionData()
    const navigation = useNavigation()
    const params = useParams()
    const formRef = useRef(null)
    function resetForms() {
        formRef.current.reset()
    }
    console.log("loader data", loaderData)
    const posts = loaderData.replies.documents.map((post, i) => <ForumPost key={i} data={post}/>)
    return (
        <div className="grid">
            <Link to="../" relative="path" className="container mx-auto p-2 my-2 ">⬅ Back to {params.section}</Link>
            <ForumPost data={loaderData.opening} />
            {posts}
            {actionData?.success && resetForms()}
            <Form
                method="post"
                className="container flex flex-col mx-auto"
                ref={formRef}
            >
                <textarea
                    name="reply"
                    placeholder="Reply"
                    className="border rounded px-8 py-4 my-2 dark:bg-gray-900"
                />
                <button
                    disabled={navigation.state === "submitting"}
                    className='border w-full py-2 my-2 rounded bg-sky-600 mx-auto font-bold border-neutral-600  text-gray-50'
                >
                    {navigation.state === "submitting"
                        ? "Posting reply..."
                        : "Post reply"
                    }
                </button>
            </Form>
        </div>
    )
}