import { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setUser } from "../authSlice";
import { setActiveConversation } from "../../chat/chatSlice";
import {
  addAccount,
  updateAccountStatus,
  removeAccount,
} from "../../accounts/accountsSlice";
import { t } from "../../../utils/i18n";
import type { User } from "../../../types";
import { Avatar } from "../../../components";
import "./AccountPicker.css";

const PAGE_SIZE = 5;

const AccountPicker = () => {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts.list);
  const lang = useAppSelector((state) => state.settings.language);
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return accounts;
    const q = search.toLowerCase();
    return accounts.filter((a) => a.name.toLowerCase().includes(q));
  }, [accounts, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleSelect = (account: User) => {
    dispatch(setActiveConversation(null));
    dispatch(updateAccountStatus({ id: account.id, status: "online" }));
    dispatch(setUser({ ...account, status: "online" }));
  };

  const handleAdd = () => {
    const name = newName.trim();
    if (!name) return;
    dispatch(addAccount(name));
    setNewName("");
    setShowAddModal(false);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      dispatch(removeAccount(deleteTarget.id));
      setDeleteTarget(null);
      if (page > 0 && visible.length <= 1) {
        setPage((p) => p - 1);
      }
    }
  };

  return (
    <div className="account-picker">
      <div className="account-picker__card">
        <h1 className="account-picker__title">{t("picker.title", lang)}</h1>
        <p className="account-picker__subtitle">{t("picker.subtitle", lang)}</p>

        <div className="account-picker__search">
          <i className="fas fa-search account-picker__search-icon" />
          <input
            className="account-picker__search-input"
            type="text"
            placeholder={t("search.placeholder", lang)}
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        <div className="account-picker__slider">
          {page > 0 && (
            <button
              className="account-picker__arrow account-picker__arrow--up"
              onClick={() => setPage((p) => p - 1)}
            >
              <i className="fas fa-chevron-up" />
            </button>
          )}

          <div className="account-picker__list">
            {visible.map((acc) => (
              <div key={acc.id} className="account-picker__row">
                <button
                  className="account-picker__item"
                  onClick={() => handleSelect(acc)}
                >
                  <Avatar name={acc.name} size="lg" status={acc.status} />
                  <span className="account-picker__name">{acc.name}</span>
                </button>
                <button
                  className="account-picker__delete-btn"
                  title="Delete account"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTarget(acc);
                  }}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            ))}
            {visible.length === 0 && (
              <p className="account-picker__empty">No accounts found</p>
            )}
          </div>

          {page < totalPages - 1 && (
            <button
              className="account-picker__arrow account-picker__arrow--down"
              onClick={() => setPage((p) => p + 1)}
            >
              <i className="fas fa-chevron-down" />
            </button>
          )}
        </div>

        <button
          className="account-picker__add-link"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-user-plus" />
          {lang === "vi" ? "Thêm tài khoản" : "Add account"}
        </button>
      </div>

      {showAddModal && (
        <div
          className="account-picker__overlay"
          onClick={() => {
            setShowAddModal(false);
            setNewName("");
          }}
        >
          <div
            className="account-picker__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="account-picker__modal-icon">
              <i className="fas fa-user-plus" />
            </div>
            <h3 className="account-picker__modal-title">
              {lang === "vi" ? "Thêm tài khoản" : "Add account"}
            </h3>
            <p className="account-picker__modal-text">
              {lang === "vi"
                ? "Nhập tên tài khoản mới bên dưới"
                : "Enter a new account name below"}
            </p>
            <input
              className="account-picker__modal-input"
              type="text"
              placeholder={t("picker.inputPlaceholder", lang)}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              autoFocus
            />
            <div className="account-picker__modal-actions">
              <button
                className="account-picker__modal-btn account-picker__modal-btn--cancel"
                onClick={() => {
                  setShowAddModal(false);
                  setNewName("");
                }}
              >
                {lang === "vi" ? "Hủy" : "Cancel"}
              </button>
              <button
                className="account-picker__modal-btn account-picker__modal-btn--confirm"
                onClick={handleAdd}
              >
                <i className="fas fa-plus" /> {t("picker.addBtn", lang)}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className="account-picker__overlay"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="account-picker__modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="account-picker__modal-icon">
              <i className="fas fa-exclamation-triangle" />
            </div>
            <h3 className="account-picker__modal-title">
              {lang === "vi" ? "Xác nhận xóa" : "Confirm delete"}
            </h3>
            <p className="account-picker__modal-text">
              {lang === "vi"
                ? `Bạn có chắc muốn xóa tài khoản "${deleteTarget.name}"?`
                : `Are you sure you want to delete "${deleteTarget.name}"?`}
            </p>
            <div className="account-picker__modal-actions">
              <button
                className="account-picker__modal-btn account-picker__modal-btn--cancel"
                onClick={() => setDeleteTarget(null)}
              >
                {lang === "vi" ? "Hủy" : "Cancel"}
              </button>
              <button
                className="account-picker__modal-btn account-picker__modal-btn--delete"
                onClick={handleDeleteConfirm}
              >
                {lang === "vi" ? "Xóa" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPicker;
