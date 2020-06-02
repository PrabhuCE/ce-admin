export const tenantList = [
  {
    id: 191,
    tenants: [
      { id: 1, tenant_id: "mdb-aa050520", name: "myathinaB2C" },
      { id: 2, tenant_id: "mdb-ab050520", name: "AnsrSource-B2B" },
      { id: 3, tenant_id: "mdb-ac050520", name: "GoNiyo-B2B" },
    ],
  },
  {
    id: 192,
    tenants: [{ id: 1, tenant_id: "mdb-1212121", name: "TableVision-B2C" }],
  },
  {
    id: 193,
    tenants: [
      { id: 1, tenant_id: "mdb-1212121", name: "Prep-abc" },
      { id: 2, tenant_id: "mdb-1212121", name: "Prep-def" },
      { id: 3, tenant_id: "mdb-1212121", name: "Prep-fgh" },
    ],
  },
];




const loginPayload =
{
  username: "dfdfdf",
  password: 121212,
  product: 'TV'
}


const response = {
  userDetails: "",
  tenantInfo: {
    id: 193,
    tenants: [
      { id: 1, tenant_id: "mdb-1212121", name: "Prep-abc" },
      { id: 2, tenant_id: "mdb-1212121", name: "Prep-def" },
      { id: 3, tenant_id: "mdb-1212121", name: "Prep-fgh" },
    ]
  }
}