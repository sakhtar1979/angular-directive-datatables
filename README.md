angular-directive-datatables
============================

jQuery DataTables directive for AngularJS.

A quick way to use [jQuery DataTables](https://datatables.net/) plugin in AngularJS with HTML (not just data) in the table.

## Example

```html
<table datatable>
    <thead>
        <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Active</th>
            <th>lastLogin</th>
        </tr>
    </thead>
    <tbody>
        <tr ng-repeat="row in users">
            <td><img ng-src="{{row.photo}}" alt="{{row.firstName}}" /></td>
            <td><a ng-href="users.html?userid={{row.userID}}" title="{{row.FirstName}} {{row.lastName}}">{{row.FirstName}} {{row.lastName}}</a></td>
            <td>{{row.email}}</td>
            <td>{{row.phone}}</td>
            <td><i ng-class="{'icon-checkmark green': row.isActive,  'icon-close red': !row.isActive}"></i></td>
            <td>{{row.lastLogin | date:'short'}}</td>
        </tr>
    </tbody>
</table>
```