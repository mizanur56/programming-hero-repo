// const milestoneData = JSON.parse(data).data;

// // course milestone data

// function loadMilestones() {
//   const milestones = document.querySelector(".milestones");

//   milestones.innerHTML = `${milestoneData
//     .map(function (milestone) {
//       return `<div class="milestone border-b">
//             <div class="flex">
//               <div class="checkbox"><input type="checkbox" onclick=" markMileStone(this ,${
//                 milestone._id
//               })" /></div>
//               <div onclick ="openMilestone(this ,${milestone._id})">
//                 <p>
//                  ${milestone.name}
//                   <span><i class="fas fa-chevron-down"></i></span>
//                 </p>
//               </div>
//             </div>
//             <div class="hidden_panel">
//              ${milestone.modules
//                .map(function (module) {
//                  return ` <div class="module border-b">
//                 <p>${module.name}</p>
//               </div>`;
//                })
//                .join("")}
//             </div>
//           </div>`;
//     })
//     .join("")}`;
// }

// function openMilestone(milestoneElement, id) {
//   const currentElement = milestoneElement.parentNode.nextElementSibling;
//   const shownPanel = document.querySelector(".show");
//   const activePanel = document.querySelector(".active");

//   if (!milestoneElement.classList.contains("active") && activePanel)
//     activePanel.classList.remove("active");
//   milestoneElement.classList.toggle("active");

//   if (!currentElement.classList.contains("show") && shownPanel)
//     shownPanel.classList.remove("show");

//   currentElement.classList.toggle("show");

//   showMilestone(id);
// }

// function showMilestone(id) {
//   const milestoneImg = document.querySelector(".milestoneImage");
//   const milestoneTitle = document.querySelector(".title");
//   const milestoneDetails = document.querySelector(".details");

//   milestoneImg.style.opacity = "0";

//   milestoneImg.src = milestoneData[id].image;
//   milestoneTitle.innerText = milestoneData[id].name;
//   milestoneDetails.innerText = milestoneData[id].description;
// }
// const milestoneImg = document.querySelector(".milestoneImage");
// milestoneImg.onload = function () {
//   this.style.opacity = "1";
// };
// function markMileStone(checkbox, id) {
//   const doneList = document.querySelector(".doneList");
//   const milestonesList = document.querySelector(".milestones");
//   const item = document.getElementById(id);

//   if (checkbox.checked) {
//     // mark as done
//     milestonesList.removeChild(item);
//     doneList.appendChild(item);
//   } else {
//     // back to main list
//     milestonesList.appendChild(item);
//     doneList.removeChild(item);
//   }
// }
// loadMilestones();

const milestonesData = JSON.parse(data).data;

// load course milestones data
function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return `<div class="milestone border-b" id="${milestone._id}">
      <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${
          milestone._id
        })" /></div>
        <div onclick="openMilestone(this, ${milestone._id})">
          <p>
            ${milestone.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
        ${milestone.modules
          .map(function (module) {
            return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`;
          })
          .join("")}
      </div>
    </div>`;
    })
    .join("")}`;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");

  if (active && !milestoneElement.classList.contains("active")) {
    active.classList.remove("active");
  }

  milestoneElement.classList.toggle("active");

  if (!currentPanel.classList.contains("show") && shownPanel)
    shownPanel.classList.remove("show");

  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};

function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (!item || !doneList || !milestonesList) {
    console.error("Element(s) not found in the DOM");
    return;
  }

  if (checkbox.checked) {
    item.dataset.originalIndex = Array.from(milestonesList.children).indexOf(
      item
    );
    milestonesList.removeChild(item);
    doneList.appendChild(item);
  } else {
    const originalIndex = item.dataset.originalIndex;
    const referenceNode = milestonesList.children[originalIndex] || null;
    doneList.removeChild(item);
    milestonesList.insertBefore(item, referenceNode);
  }
}

loadMilestones();
