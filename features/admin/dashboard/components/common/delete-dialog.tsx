import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Project } from "@/types/portfolio.types"
import axios from "axios"
import { LoaderCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"

const DeleteDialog = ({ project }: { project: Project }) => {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false)

    const handleDelete = () => {
        const deleteFun = async () => {
            try {
                setPending(true)
                const res = await axios.delete(`/api/projects?id=${project._id}`)
                window.location.reload()
                return res.data;

            } catch (er) {
                throw new Error(`Error while Deleting Project: ${er}`)
            } finally {
                setPending(false)
            }
        }

        toast.promise(deleteFun, {
            pending: "Deleting Project...",
            success: "Deleted successfully! 🚀",
            error: "Failed to Delete Project 🤯",
        });
    }

    return (
        <Dialog onOpenChange={(v) => {
            if (!pending) {
                setOpen(v)
            }
        }}
            open={open}>
            <DialogTrigger asChild>
                <Button className='cursor-pointer' onClick={(e) => {
                    e.stopPropagation()
                }}>
                    <Trash2 />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete {project.title ? <strong className="text-white"> &quot;{project.title}&quot; </strong> : " the project "}
                        and remove all associated images and videos from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => {
                        setOpen(false)
                    }}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        {pending && <LoaderCircle className="animate-spin" />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialog
