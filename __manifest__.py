# -*- coding: utf-8 -*-
################################################################################
#
#    Cybrosys Technologies Pvt. Ltd.
#
#    Copyright (C) 2022-TODAY Cybrosys Technologies(<https://www.cybrosys.com>).
#    Author: SAFA FAHEEM P E (odoo@cybrosys.com)
#
#    You can modify it under the terms of the GNU AFFERO
#    GENERAL PUBLIC LICENSE (AGPL v3), Version 3.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU AFFERO GENERAL PUBLIC LICENSE (AGPL v3) for more details.
#
#    You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
#    (AGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
################################################################################

{
    "name": "Edit Button In Odoo17",
    "version": "17.0.0.0.1",
    "summary": "Edit Button Odoo17",
    "description": "Edit Button in Odoo17",
    "author": "Machiels Kyan",
    "company": "e-power",
    "maintainer": "Machiels Kyan",
    "website": "https://e-powerinternational.com/",
    "depends": ["base", "product"],
    "data": [],
    "assets": {
        "web.assets_backend": [
            "/edit_save_button/static/src/views/form/form_controller.js",
            "/edit_save_button/static/src/views/form/form_controller.xml",
        ]
    },
    "license": "AGPL-3",
    "installable": True,
    "auto_install": False,
    "application": False,
}
