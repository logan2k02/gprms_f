import { type FC, useEffect, useState } from "react";

import type { StaffUser } from "@/interfaces/staff-user";
import { StaffService } from "@/services/staff/admin/staff";
import { PageError } from "@/ui/staff/shared/page-error";
import { PageLoader } from "@/ui/staff/shared/page-loader";
import { PersonAdd } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { QKs } from "../../query-keys";
import { PageLayout } from "../../shared/page-layout";
import { AccountRow } from "./account-row";
import { FilterBar } from "./filter-bar";
import { ManageAccountDialog } from "./manage-account-dialog";

export const Admin_StaffPage: FC = () => {
  const [showingRows, setShowingRows] = useState<StaffUser[]>([]);
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const { isPending, error, data } = useQuery({
    queryKey: QKs.admin_staff,
    queryFn: () => StaffService.getStaffAccounts(),
  });

  useEffect(() => {
    if (!data) {
      setShowingRows([]);
      return;
    }

    let filteredData = data;

    if (roleFilter.length) {
      filteredData = filteredData.filter((d) => roleFilter.includes(d.role));
    }

    if (searchFilter.trim().length) {
      const searchLower = searchFilter.toLowerCase();
      filteredData = filteredData.filter(
        (d) =>
          d.username.toLowerCase().includes(searchLower) ||
          d.name.toLowerCase().includes(searchLower)
      );
    }

    setShowingRows(filteredData);
  }, [data, roleFilter, searchFilter]);

  const [newAccountDialogOpen, setNewAccountDialogOpen] = useState(false);

  if (isPending) {
    return <PageLoader />;
  }

  if (error) {
    return <PageError title="staff members list" error={error} />;
  }

  return (
    <>
      <PageLayout
        title="Staff Accounts"
        subtitle="It's your restaurant's team members. You can add new staff and manage existing accounts."
        button={{
          icon: <PersonAdd />,
          text: "New Staff Account",
          onClick: () => setNewAccountDialogOpen(true),
        }}
      >
        <FilterBar
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                <TableCell width="20%">Role & Permissions</TableCell>
                <TableCell width="20%">Username</TableCell>
                <TableCell width="30%">Name</TableCell>
                <TableCell width="30%" align="right">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showingRows.map((account) => (
                <AccountRow
                  key={account.id}
                  account={account}
                  setRoleFilter={setRoleFilter}
                />
              ))}
              {!showingRows.length && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="body2" color="textSecondary">
                      No staff accounts found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </PageLayout>
      <ManageAccountDialog
        open={newAccountDialogOpen}
        handleClose={() => setNewAccountDialogOpen(false)}
      />
    </>
  );
};
