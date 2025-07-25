import { getBackendErrorMessage } from "@/backend";
import { getCloudinaryImageUrl } from "@/cloudinary";
import { useAlert } from "@/hooks/useAlert";
import { useConfirmation } from "@/hooks/useConfirmation";
import type { DiningArea } from "@/interfaces/dining-area";
import { DiningAreasService } from "@/services/staff/admin/dining-areas";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type FC, useState } from "react";
import { QKs } from "../../query-keys";
import { AssignWaitersDialog } from "./assign-waiters-dialog";
import { ManageDiningAreaDialog } from "./manage-dining-area-dialog";

export const DiningAreaCard: FC<{
  diningArea: DiningArea;
}> = ({ diningArea }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [assignWaitersDialogOpen, setAssignWaitersDialogOpen] = useState(false);

  const { showError, showSuccess } = useAlert();

  const { confirm } = useConfirmation();

  const queryClient = useQueryClient();

  const { mutate: deleteDiningArea, isPending: isDeleting } = useMutation({
    mutationFn: () => DiningAreasService.delete(diningArea.id),
    mutationKey: ["admin_manageDiningArea_deleteDiningArea"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QKs.admin_diningAreas });
      showSuccess("Dining area deleted successfully.");
    },
    onError: (err) => {
      showError(`Failed to delete dining area: ${getBackendErrorMessage(err)}`);
    },
  });

  return (
    <>
      <Card>
        <CardMedia
          sx={{ height: 140 }}
          image={getCloudinaryImageUrl(diningArea.image)}
          title={`${diningArea.name} image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {diningArea.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {diningArea.description || "No description provided."}
          </Typography>
          <Stack direction="row" spacing={1} mt={2}>
            <Chip
              size="small"
              disabled={!diningArea.diningTables.length}
              label={
                diningArea.diningTables.length
                  ? `${diningArea.diningTables.length} Table${
                      diningArea.diningTables.length === 1 ? "" : "s"
                    }`
                  : "No tables"
              }
            />
            <Chip
              size="small"
              disabled={!diningArea.assignedWaiters.length}
              label={
                diningArea.assignedWaiters.length
                  ? `${diningArea.assignedWaiters.length} Waiter${
                      diningArea.assignedWaiters.length === 1 ? "" : "s"
                    } Assigned`
                  : "No waiters"
              }
            />
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="info"
            sx={{ flexShrink: 0 }}
            disabled={isDeleting}
            onClick={() => setAssignWaitersDialogOpen(true)}
          >
            Assign Waiters
          </Button>
          <Button
            size="small"
            onClick={() => {
              setEditDialogOpen(true);
            }}
            disabled={isDeleting}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            disabled={isDeleting}
            onClick={async () => {
              if (
                await confirm({
                  title: "Are you sure?",
                  message: `You are going to delete the dining area '${diningArea.name}'. This action cannot be undone.`,
                  confirmButtonDanger: true,
                  confirmText: "Yes, Delete",
                })
              ) {
                deleteDiningArea();
              }
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
      <ManageDiningAreaDialog
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        editingDiningArea={diningArea}
      />
      <AssignWaitersDialog
        open={assignWaitersDialogOpen}
        handleClose={() => setAssignWaitersDialogOpen(false)}
        diningArea={diningArea}
      />
    </>
  );
};
