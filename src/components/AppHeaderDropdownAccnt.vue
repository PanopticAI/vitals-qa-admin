<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import avatar from '@/assets/images/avatars/8.jpg'
import api from '@/services/api'

const router = useRouter()
const itemsCount = 42
const showLogoutModal = ref(false)

const handleLogoutClick = () => {
  showLogoutModal.value = true
}

const confirmLogout = () => {
  api.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>
      <CDropdownItem>
        <CIcon icon="cil-bell" /> Updates
        <CBadge color="info" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-envelope-open" /> Messages
        <CBadge color="success" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-task" /> Tasks
        <CBadge color="danger" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-comment-square" /> Comments
        <CBadge color="warning" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold my-2"
      >
        Settings
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-settings" /> Settings </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-dollar" /> Payments
        <CBadge color="secondary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownItem>
        <CIcon icon="cil-file" /> Projects
        <CBadge color="primary" class="ms-auto">{{ itemsCount }}</CBadge>
      </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem> <CIcon icon="cil-shield-alt" /> Lock Account </CDropdownItem>
      <CDropdownItem @click="handleLogoutClick"> <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>

  <!-- Logout Confirmation Modal -->
  <CModal
    alignment="center"
    :visible="showLogoutModal"
    @close="showLogoutModal = false"
  >
    <CModalHeader>
      <CModalTitle>Confirm Logout</CModalTitle>
    </CModalHeader>
    <CModalBody>Are you sure you want to logout?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="showLogoutModal = false">
        Cancel
      </CButton>
      <CButton color="danger" @click="confirmLogout">
        Logout
      </CButton>
    </CModalFooter>
  </CModal>
</template>
