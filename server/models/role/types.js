module.exports = `

  type RoleList {
    total: Int
    results: [Role]
  }

  type Role {
    id: ID!
    label: String
    system: String
  }
`